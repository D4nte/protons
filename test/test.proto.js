'use strict'
module.exports = `message Basic {
  required double num = 1;
  required bytes payload = 2;
}

message Map {
  map<string, string> foo = 1;
}

message UTF8 {
  required string foo = 1;
  required uint32 bar = 2;
}

message Nested {
  required double num = 1;
  required bytes payload = 2;
  required Basic meh = 3;
}

message Repeated {
  repeated Basic list = 1;
}

message Optional {
  optional int32 value = 1;
}

message Integers {
  optional sint32 sint32 = 1;
  optional sint64 sint64 = 2;
  optional int32 int32 = 3;
  optional uint32 uint32 = 4;
  optional int64 int64 = 5;
  optional fixed32 fixed32 = 6;
}

message Float {
  optional float float1 = 1;
  optional float float2 = 2;
  optional float float3 = 3;
}

message Strings {
  required string name = 1;
  optional string desc = 2;
}

message Booleans {
  required bool bool1 = 1;
  optional bool bool2 = 2;
}

message Bytes {
  required bytes req = 1;
  optional bytes opt = 2;
}

message CustomType {
  required Basic req = 1;
  optional Basic opt = 2;
}

message Packed {
  repeated Basic list = 1;
  repeated int32 packed = 2 [packed=true];
}

message NotPacked {
  repeated int64 id = 2;
  optional int64 value = 5;
}
message FalsePacked {
  repeated int64 id = 2 [packed=false];
  optional int64 value = 5;
}

enum FOO {
  A = 1;
  B = 2;
}

message Defaults {
  optional int32 num = 1 [default = 42];
  optional FOO foo1 = 2 [default = B];
  optional FOO foo2 = 3;
  repeated FOO foos = 4;
}

enum FOO_HEX {
  A = 0x01;
  B = 0x02;
}

message Property {
  required string name = 1;
  optional string desc = 2;

  oneof value {
    bool bool_value = 3;
    float float_value = 4;
    int32 int_value = 5;
    string string_value = 6;
  }
}

message PropertyNoOneof {
  required string name = 1;
  optional string desc = 2;

  optional bool bool_value  = 3;
  optional float float_value = 4;
  optional int32 int_value = 5;
  optional string string_value = 6;
}

message ComplexProperty {
  required string name = 1;

  oneof value {
    bool bool_value  = 3;
    float float_value = 4;
    int32 int_value = 5;
    string string_value = 6;
  }

  oneof another_value {
    bool bool_value  = 7;
    float float_value = 8;
    int32 int_value = 9;
    string string_value = 10;
  }
}`
