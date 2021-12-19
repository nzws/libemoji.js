{
  "targets": [
    {
      "target_name": "libemoji",
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "libraries": [
        "-L../externals/libemoji/lib",
        "-lemoji",
        "-ldl",
        "-lfontconfig",
        "-lfreetype",
        "-lGL",
        "-lGLU",
        "-lpthread"
      ],
      "sources": [ "src/main.cpp" ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")",
        "./externals/libemoji/include"
      ],
      'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
    }
  ]
}
