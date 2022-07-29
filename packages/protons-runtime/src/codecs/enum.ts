
import { unsigned } from 'uint8-varint'
import { createCodec, CODEC_TYPES, DefaultValueFunction, IsDefaultValueFunction } from '../codec.js'
import type { DecodeFunction, EncodeFunction, EncodingLengthFunction, Codec } from '../codec.js'
import { allocUnsafe } from '../utils/alloc.js'

export function enumeration <T> (v: any): Codec<T> {
  function findValue (val: string | number): number {
    if (v[val.toString()] == null) {
      throw new Error('Invalid enum value')
    }

    if (typeof val === 'number') {
      return val
    }

    return v[val]
  }

  const encodingLength: EncodingLengthFunction<number | string> = function enumEncodingLength (val) {
    return unsigned.encodingLength(findValue(val))
  }

  const encode: EncodeFunction<number | string> = function enumEncode (val) {
    const enumValue = findValue(val)

    const buf = allocUnsafe(unsigned.encodingLength(enumValue))
    unsigned.encode(enumValue, buf)

    return buf
  }

  const decode: DecodeFunction<number | string> = function enumDecode (buf, offset) {
    const value = unsigned.decode(buf, offset)
    const strValue = value.toString()

    // Use the reverse mapping to look up the enum key for the stored value
    // https://www.typescriptlang.org/docs/handbook/enums.html#reverse-mappings
    if (v[strValue] == null) {
      throw new Error('Invalid enum value')
    }

    return v[strValue]
  }

  const defaultValue: DefaultValueFunction<number | string> = function defaultValue () {
    return Object.values(v)[0] as (string | number)
  }

  const isDefaultValue: IsDefaultValueFunction<number| string> = function isDefaultValue (val) {
    return val === defaultValue()
  }

  // @ts-expect-error yeah yeah
  return createCodec('enum', CODEC_TYPES.VARINT, encode, decode, encodingLength, defaultValue, isDefaultValue)
}
