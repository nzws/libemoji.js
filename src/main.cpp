#include <napi.h>

#include <cstdlib>
#include <iostream>
#include <string>

#include "emoji.h"

using namespace std;
using namespace Napi;

EgAlign strToEgAlign(string str) {
    if (str == "left") {
        return kLeft_Align;
    } else if (str == "right") {
        return kRight_Align;
    } else if (str == "center") {
        return kCenter_Align;
    }

    throw invalid_argument(
        "align must be one of the following: left, right, center");
}

EgFormat strToEgFormat(string str) {
    if (str == "png") {
        return kPNG_Format;
    } else if (str == "webp") {
        return kWEBP_Format;
    }

    throw invalid_argument("format must be one of the following: png, webp");
}

Value Generate(const CallbackInfo& info) {
    Env env = info.Env();
    Object returnValue = Object::New(env);
    const string text = info[0].As<String>().Utf8Value();
    const Object args = info[1].As<Object>();

    EgGenerateParams params;
    memset(&params, 0, sizeof(params));

    params.fText = text.c_str();
    params.fWidth = args.Get("width").As<Number>().Int32Value();
    params.fHeight = args.Get("height").As<Number>().Int32Value();
    params.fColor = args.Get("color").As<Number>().Int32Value();
    params.fBackgroundColor =
        args.Get("backgroundColor").As<Number>().Int32Value();
    params.fTextAlign =
        strToEgAlign(args.Get("textAlign").As<String>().Utf8Value());
    params.fTextSizeFixed = args.Get("textSizeFixed").As<Boolean>().Value();
    params.fDisableStretch = args.Get("disableStretch").As<Boolean>().Value();
    params.fFormat = strToEgFormat(args.Get("format").As<String>().Utf8Value());

    const string typefaceFile =
        args.Get("typefaceFile").As<String>().Utf8Value();
    if (typefaceFile.length() > 0) {
        params.fTypefaceFile = typefaceFile.c_str();
    }

    const string typefaceName =
        args.Get("typefaceName").As<String>().Utf8Value();
    if (typefaceName.length() > 0) {
        params.fTypefaceName = typefaceName.c_str();
    }

    EgGenerateResult result;
    if (emoji_generate(&params, &result) != EG_OK) {
        emoji_free(&result);
        TypeError::New(env, "Failed to create emoji")
            .ThrowAsJavaScriptException();

        return returnValue;
    }

    returnValue.Set("buffer",
                    Buffer<char>::Copy(env, (char*)result.fData, result.fSize));
    emoji_free(&result);

    return returnValue;
}

Object Init(Env env, Object exports) {
    exports.Set(String::New(env, "generate"), Function::New(env, Generate));

    return exports;
}

NODE_API_MODULE(libemoji, Init)
