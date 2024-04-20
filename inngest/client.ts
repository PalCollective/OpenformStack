import { Inngest } from "inngest";

const runtimeConfig = useRuntimeConfig();
export const inngest = new Inngest({ id: "OpenformStack", key: runtimeConfig.inngestEventKey });
