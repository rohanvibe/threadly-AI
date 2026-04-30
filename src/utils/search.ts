export async function searchWeb(query: string) {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) {
    return "Web search is currently disabled. Please add TAVILY_API_KEY to your environment variables.";
  }

  try {
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: apiKey,
        query: query,
        search_depth: "basic",
        include_answer: true,
        include_images: true,
        max_results: 5,
      }),
    });

    if (!response.ok) {
      return `Search failed with status ${response.status}`;
    }

    const data = await response.json();
    
    // Combine search results into a concise string
    const results = data.results.map((r: any) => 
      `Source: ${r.title}\nURL: ${r.url}\nContent: ${r.content}`
    ).join('\n\n');

    const images = data.images && data.images.length > 0 
      ? `\n\nIMAGES FOUND:\n${data.images.map((img: string) => img).join('\n')}`
      : '';

    return `SEARCH RESULTS FOR "${query}":\n\n${results}${images}\n\nSUMMARY: ${data.answer || 'No direct answer available.'}`;
  } catch (error) {
    console.error('Search Error:', error);
    return "An error occurred during web search.";
  }
}
