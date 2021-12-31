#include <napi.h>
#include <stdio.h>
#include <string.h>

#include "../../libemoji/include/emoji.h"

Napi::Value HelloWorld(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    EgGenerateParams params;
    memset(&params, 0, sizeof(params));
    params.fText = "絵文\n字。";
    params.fWidth = 256;
    params.fHeight = 256;

    EgGenerateResult result;
    if (emoji_generate(&params, &result) != EG_OK) {
        emoji_free(&result);
        Napi::TypeError::New(env, "Failed to create emoji")
            .ThrowAsJavaScriptException();

        return env.Undefined();
    }

    FILE* fp = fopen("./emoji.png", "w");
    fwrite(result.fData, result.fSize, 1, fp);
    fclose(fp);

    emoji_free(&result);

    return Napi::String::New(env, "world");
}

Napi::Object CreateObj(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    Napi::Object obj = Napi::Object::New(env);

    obj.Set("msg", Napi::String::New(env, "hello"));
    return obj;
}

Napi::Value GetArgs(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    Napi::Object obj = Napi::Object::New(env);

    if (info.Length() < 2) {
        Napi::TypeError::New(env, "Wrong number of arguments")
            .ThrowAsJavaScriptException();

        return env.Undefined();
    }

    if (!info[0].IsNumber() || !info[1].IsString()) {
        Napi::TypeError::New(env, "Wrong arguments")
            .ThrowAsJavaScriptException();

        return env.Undefined();
    }

    double arg0 = info[0].As<Napi::Number>().DoubleValue();
    std::string arg1 = info[1].As<Napi::String>();

    obj.Set("arg0", Napi::Number::New(env, arg0));
    obj.Set("arg1", Napi::String::New(env, arg1));

    return obj;
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "hello"),
                Napi::Function::New(env, HelloWorld));
    exports.Set(Napi::String::New(env, "createObj"),
                Napi::Function::New(env, CreateObj));
    exports.Set(Napi::String::New(env, "getArgs"),
                Napi::Function::New(env, GetArgs));

    return exports;
}

NODE_API_MODULE(libemoji, Init)
