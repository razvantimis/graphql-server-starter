import { print } from "graphql";
import { Config } from "apollo-server-koa";
import { getServerConfig } from "@config";

export class BasicLogging {
  requestDidStart({ queryString, parsedQuery, variables }: any) {
    const query = queryString || print(parsedQuery);
    console.log("[Graphql] Request query -------------- \n", query);
    console.log("[Graphql] Request variables ----------- \n", variables);
  }

  willSendResponse({ graphqlResponse }: any) {
    if (graphqlResponse && graphqlResponse.errors) {
      console.log(
        "[Graphql] response error",
        JSON.stringify(graphqlResponse, null, 2)
      );
    }
  }
}

export function getBaseApolloConfig(): Config {
  const config: Config = {};
  const serverConfig = getServerConfig();
  const apolloConfig = serverConfig.apolloConfig;
  if (apolloConfig && apolloConfig.engineApiKey) {
    config.engine = {
      apiKey: apolloConfig.engineApiKey
    };
  }

  if (serverConfig.isProduction) {
    config.extensions = [() => new BasicLogging()];
  }
  return config;
}
