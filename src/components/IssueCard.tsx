import Link from "next/link";
import type { Issue } from "@/types/issue";
import { JSX } from "react";

export default function IssueCard({ issue }: { issue: Issue }): JSX.Element {
  const cover = issue.cover_path ?? issue.cover ?? "/covers/default.jpg";

  return (
    <article className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      {/* Cover image */}
      <img
        src={cover}
        alt={issue.title}
        className="w-full h-64 object-cover"
      />

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{issue.title}</h3>

        {issue.description && (
          <p className="text-gray-600 mb-3 line-clamp-3">{issue.description}</p>
        )}

        {issue.published_at && (
          <p className="text-sm text-gray-500 mb-3">
            Published: {new Date(issue.published_at).toLocaleDateString()}
          </p>
        )}

        <Link
          href={`/issues/${issue.id}`}
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View
        </Link>
      </div>
    </article>
  );
}
