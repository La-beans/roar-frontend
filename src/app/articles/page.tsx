import type { Article } from "@/types/article";

export default async function ArticlesPage() {
  let articles: Article[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles`, { cache: "no-store" });
    if (res.ok) {
      articles = await res.json();
    }
  } catch (err) {
    console.error("Error fetching articles:", err);
  }

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6 text-center">Articles</h1>
      <div className="space-y-6">
        {articles.length === 0 ? (
          <p className="text-center text-gray-500">No articles yet.</p>
        ) : (
          articles.map((article) => (
            <article key={article.id} className="bg-white p-4 shadow rounded">
              <h2 className="text-xl font-semibold">{article.title}</h2>
              <p className="text-sm text-gray-500">
                by {article.author_name} (from {article.issue_title})
              </p>
              <p className="mt-2 text-gray-700">{article.content.slice(0, 200)}...</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
