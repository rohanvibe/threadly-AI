// Base AI Provider Interface
import { AIProvider, ChatCompletionRequest, ChatCompletionResponse } from '../types';

export abstract class BaseProvider implements AIProvider {
  abstract name: string;
  abstract model: string;
  protected apiKey: string;
  protected baseURL: string;

  constructor(apiKey: string, baseURL: string) {
    this.apiKey = apiKey;
    this.baseURL = baseURL;
  }

  abstract complete(request: ChatCompletionRequest): Promise<ChatCompletionResponse>;
  abstract stream(request: ChatCompletionRequest): Promise<ReadableStream>;

  protected async makeRequest(
    endpoint: string,
    body: any,
    stream: boolean = false
  ): Promise<Response> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`${this.name} API Error: ${response.status} - ${error}`);
    }

    return response;
  }
}
