#include <stdio.h>
#include <string.h>

#include "../externals/libemoji/include/emoji.h"

int main(void) {
    EgGenerateParams params;
    memset(&params, 0, sizeof(params));
    params.fText = "絵文\n字。";
    params.fWidth = 256;
    params.fHeight = 256;

    EgGenerateResult result;
    if (emoji_generate(&params, &result) != EG_OK) {
        emoji_free(&result);
        return -1;
    }

    FILE *fp = fopen("./emoji.png", "w");
    fwrite(result.fData, result.fSize, 1, fp);
    fclose(fp);

    emoji_free(&result);
    return 0;
}
