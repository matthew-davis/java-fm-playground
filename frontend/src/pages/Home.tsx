function Home() {
  return (
    <div className="container px-6 py-8 w-1/3">
      <h3 className="text-3xl font-medium text-gray-700">Welcome to the Java FM Playground!</h3>
      <div className="my-8">
        The Java Foundation Model (FM) Playground is a sample application showcasing how to leverage Amazon
        Bedrock using Java. As any sample application, it is not production-ready. It is provided
        for the sole purpose of illustrating how Java developers can leverage Amazon Bedrock to build
        generative AI-enabled applications.
      </div>
      <div className="mt-4">
        Amazon Bedrock is a fully managed service that offers a choice of high-performing foundation
        models (FMs) from leading AI companies like AI21 Labs, Anthropic, Cohere, Meta, Stability AI,
        and Amazon via a single API.
      </div>
    </div>
  );
}

export default Home;
