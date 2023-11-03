package aws.community.examples.bedrock.models;

import org.json.JSONArray;
import org.json.JSONObject;
import software.amazon.awssdk.core.SdkBytes;
import software.amazon.awssdk.services.bedrockruntime.BedrockRuntimeClient;
import software.amazon.awssdk.services.bedrockruntime.model.InvokeModelRequest;
import software.amazon.awssdk.services.bedrockruntime.model.InvokeModelResponse;

import java.util.List;

public class StableDiffusion {

    public static Response invoke(Request body, BedrockRuntimeClient client) {
        String prompt = body.prompt;

        JSONArray promptsJson = new JSONArray(List.of(new JSONObject().put("text", prompt)));

        JSONObject jsonBody = new JSONObject()
                .put("text_prompts", promptsJson)
                .put("cfg_scale", 20)
                .put("steps", 50);

        SdkBytes sdkBytesBody = SdkBytes.fromUtf8String(jsonBody.toString());

        InvokeModelRequest request = InvokeModelRequest.builder()
                .modelId("stability.stable-diffusion-xl")
                .body(sdkBytesBody)
                .build();

        InvokeModelResponse response = client.invokeModel(request);

        byte[] bytes = new JSONObject(response.body().asUtf8String())
                .getJSONArray("artifacts")
                .getJSONObject(0)
                .get("base64")
                .toString()
                .getBytes();

        return new Response(bytes);
    }

    public record Request(String prompt) { }
    public record Response(byte[] imageByteArray) { }
}