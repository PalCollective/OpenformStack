import { serve } from "inngest/nuxt";
import { inngest } from "@/inngest/client";
import functions from "@/inngest/functions";

const runtimeConfig = useRuntimeConfig();
export default defineEventHandler(serve({ 
    client: inngest, 
    functions,
    signingKey: runtimeConfig.inngestSigningKey
 }));
