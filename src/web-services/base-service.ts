import type { WebServiceSuccessResponse } from "@/models/web-service-success-response";

export const BaseService = {
  async query<T>(
    path: string,
    accessToken?: string
  ): Promise<WebServiceSuccessResponse<T>> {
    const headers = new Headers();

    if (accessToken !== undefined) {
      headers.append("Authorization", `Bearer ${accessToken}`);
    }

    const res = await fetch(`${import.meta.env.VITE_WEB_SERVICE_URL}${path}`, {
      headers,
      method: "GET",
    });

    const json = await res.json();

    json.status = res.status;

    if (!res.ok) {
      throw json;
    }

    return json;
  },

  async mutate<T>(
    path: string,
    method: "POST" | "PUT" | "DELETE",
    form: string | FormData,
    accessToken?: string,
    isJsonBody = false
  ): Promise<WebServiceSuccessResponse<T>> {
    const headers = new Headers();

    if (isJsonBody) {
      headers.append("Content-Type", "application/json");
    }

    if (accessToken !== undefined) {
      headers.append("Authorization", `Bearer ${accessToken}`);
    }

    const res = await fetch(`${import.meta.env.VITE_WEB_SERVICE_URL}${path}`, {
      method,
      headers,
      body: form,
    });

    const json = await res.json();

    json.status = res.status;

    if (!res.ok) {
      throw json;
    }

    return json;
  },

  postJson<T>(
    path: string,
    form: { [key: string]: any },
    accessToken?: string
  ) {
    return this.mutate<T>(
      path,
      "POST",
      JSON.stringify(form),
      accessToken,
      true
    );
  },

  putJson<T>(path: string, form: { [key: string]: any }, accessToken?: string) {
    return this.mutate<T>(path, "PUT", JSON.stringify(form), accessToken, true);
  },
};
