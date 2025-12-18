import { addArticle, editArticle, removeArticle } from "./actions";
import { getArticles } from "@/lib/articles";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const articles = await getArticles();

  return (
    <div className="space-y-10">
      <section className="rounded-lg border border-[#c8ccd1] bg-white p-8 shadow-sm">
        <p className="text-xs uppercase tracking-[0.4em] text-[#72777d]">Admin desk</p>
        <h1 className="mt-2 text-4xl font-semibold text-[#202122]">Wiki Maintenance Console</h1>
      </section>

      <section className="space-y-8">
        <article className="rounded-lg border border-[#c8ccd1] bg-white shadow-sm">
          <div className="border-b border-[#c8ccd1] px-6 py-4">
            <p className="text-xs uppercase tracking-[0.4em] text-[#72777d]">Add article</p>
            <h2 className="text-2xl font-semibold text-[#202122]">Compose a new blog entry</h2>
          </div>
          <form action={addArticle} className="grid gap-4 px-6 py-6 lg:grid-cols-2">
            {[
              { label: "Title", name: "title", placeholder: "City lights at midnight" },
              { label: "Slug", name: "slug", placeholder: "city-lights-midnight" },
              { label: "Published at", name: "date", placeholder: "2025-01-24" },
              { label: "Image URL", name: "image", placeholder: "/CityLights.jpg" },
            ].map((field) => (
              <label key={field.name} className="text-xs font-semibold uppercase tracking-[0.3em] text-[#72777d]">
                {field.label}
                <input
                  name={field.name}
                  type="text"
                  placeholder={field.placeholder}
                  className="mt-2 w-full rounded border border-[#c8ccd1] bg-[#f8f9fa] px-3 py-2 text-sm text-[#202122] shadow-inner"
                  required
                />
              </label>
            ))}
            <label className="lg:col-span-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#72777d]">
              Excerpt
              <textarea
                name="excerpt"
                placeholder="Write a short teaser for the new article..."
                className="mt-2 w-full rounded border border-[#c8ccd1] bg-[#f8f9fa] px-3 py-2 text-sm text-[#202122] shadow-inner"
                rows={3}
                required
              />
            </label>
            <label className="lg:col-span-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#72777d]">
              Content
              <textarea
                name="content"
                placeholder="Full article content..."
                className="mt-2 w-full rounded border border-[#c8ccd1] bg-[#f8f9fa] px-3 py-2 text-sm text-[#202122] shadow-inner"
                rows={5}
                required
              />
            </label>
            <button
              type="submit"
              className="lg:col-span-2 rounded border border-[#3366cc] bg-[#3366cc] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#254a99]"
            >
              Save article
            </button>
          </form>
        </article>

        <article className="rounded-lg border border-[#c8ccd1] bg-white shadow-sm">
          <div className="border-b border-[#c8ccd1] px-6 py-4">
            <p className="text-xs uppercase tracking-[0.4em] text-[#72777d]">Edit article</p>
            <h2 className="text-2xl font-semibold text-[#202122]">Update an existing story</h2>
          </div>
          <form action={editArticle} className="space-y-4 px-6 py-6">
            <label className="block text-xs font-semibold uppercase tracking-[0.3em] text-[#72777d]">
              Article
              <select
                name="slug"
                className="mt-2 w-full rounded border border-[#c8ccd1] bg-[#f8f9fa] px-3 py-2 text-sm text-[#202122] shadow-inner"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select article to edit
                </option>
                {articles.map((article) => (
                  <option key={article.slug} value={article.slug}>
                    {article.title}
                  </option>
                ))}
              </select>
            </label>

            <div className="grid gap-4 lg:grid-cols-2">
              <label className="text-xs font-semibold uppercase tracking-[0.3em] text-[#72777d]">
                Title
                <input
                  name="title"
                  type="text"
                  placeholder="Leave blank to keep current title"
                  className="mt-2 w-full rounded border border-[#c8ccd1] bg-[#f8f9fa] px-3 py-2 text-sm text-[#202122] shadow-inner"
                />
              </label>
              <label className="text-xs font-semibold uppercase tracking-[0.3em] text-[#72777d]">
                Image URL
                <input
                  name="image"
                  type="text"
                  placeholder="Leave blank to keep current image"
                  className="mt-2 w-full rounded border border-[#c8ccd1] bg-[#f8f9fa] px-3 py-2 text-sm text-[#202122] shadow-inner"
                />
              </label>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <label className="text-xs font-semibold uppercase tracking-[0.3em] text-[#72777d]">
                Excerpt
                <textarea
                  name="excerpt"
                  placeholder="Leave blank to keep current excerpt"
                  className="mt-2 w-full rounded border border-[#c8ccd1] bg-[#f8f9fa] px-3 py-2 text-sm text-[#202122] shadow-inner"
                  rows={2}
                />
              </label>
              <label className="text-xs font-semibold uppercase tracking-[0.3em] text-[#72777d]">
                Published at
                <input
                  name="date"
                  type="text"
                  placeholder="YYYY-MM-DD"
                  className="mt-2 w-full rounded border border-[#c8ccd1] bg-[#f8f9fa] px-3 py-2 text-sm text-[#202122] shadow-inner"
                />
              </label>
            </div>

            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-[#72777d]">
              Content
              <textarea
                name="content"
                placeholder="Leave blank to keep current content"
                className="mt-2 w-full rounded border border-[#c8ccd1] bg-[#f8f9fa] px-3 py-2 text-sm text-[#202122] shadow-inner"
                rows={4}
              />
            </label>

            <button
              type="submit"
              className="rounded border border-[#3366cc] bg-[#3366cc] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#254a99]"
            >
              Apply edits
            </button>
          </form>
        </article>

        <article className="rounded-lg border border-[#c8ccd1] bg-white shadow-sm">
          <div className="border-b border-[#c8ccd1] px-6 py-4">
            <p className="text-xs uppercase tracking-[0.4em] text-[#72777d]">Remove article</p>
            <h2 className="text-2xl font-semibold text-[#202122]">Archive or delete</h2>
          </div>
          <form action={removeArticle} className="space-y-4 px-6 py-6">
            <label className="block text-xs font-semibold uppercase tracking-[0.3em] text-[#72777d]">
              Article
              <select
                name="slug"
                className="mt-2 w-full rounded border border-[#c8ccd1] bg-[#f8f9fa] px-3 py-2 text-sm text-[#202122] shadow-inner"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select article to remove
                </option>
                {articles.map((article) => (
                  <option key={article.slug} value={article.slug}>
                    {article.title}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="submit"
              className="rounded border border-[#d33a2c] bg-[#d33a2c] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#96291c]"
            >
              Remove article
            </button>
          </form>
        </article>
      </section>
    </div>
  );
}
