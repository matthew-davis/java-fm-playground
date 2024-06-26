package aws.community.examples.bedrock.aimodels;

import org.json.JSONArray;
import org.json.JSONObject;
import software.amazon.awssdk.core.SdkBytes;
import software.amazon.awssdk.services.bedrockruntime.BedrockRuntimeClient;
import software.amazon.awssdk.services.bedrockruntime.model.InvokeModelRequest;
import software.amazon.awssdk.services.bedrockruntime.model.InvokeModelResponse;

import java.util.Arrays;
import java.util.List;

public class StableDiffusion {

    public static final List<String> STYLES = Arrays.asList(
            "3d-model",
            "analog-film",
            "anime",
            "cinematic",
            "comic-book",
            "digital-art",
            "enhance",
            "fantasy-art",
            "isometric",
            "line-art",
            "low-poly",
            "modeling-compound",
            "neon-punk",
            "origami",
            "photographic",
            "pixel-art",
            "tile-texture"
    );

    public static Response invoke(BedrockRuntimeClient client, String prompt, String stylePreset) {

        JSONArray promptsJson = new JSONArray(List.of(new JSONObject().put("text", prompt)));
        JSONObject jsonBody = new JSONObject()
                .put("text_prompts", promptsJson)
                .put("cfg_scale", 20)
                .put("steps", 100);

        if (STYLES.contains(stylePreset)) {
            jsonBody.put("style_preset", stylePreset);
        }

        SdkBytes sdkBytesBody = SdkBytes.fromUtf8String(jsonBody.toString());

        InvokeModelRequest request = InvokeModelRequest.builder()
                .modelId("stability.stable-diffusion-xl-v1")
                .body(sdkBytesBody)
                .build();

        InvokeModelResponse response = client.invokeModel(request);
        String imageBytes = new JSONObject(response.body().asUtf8String())
                .getJSONArray("artifacts")
                .getJSONObject(0)
                .get("base64")
                .toString();

        return new Response(imageBytes);
    }

    public record Request(String prompt, String stylePreset) { }
    public record Response(String imageByteArray) { }
}
