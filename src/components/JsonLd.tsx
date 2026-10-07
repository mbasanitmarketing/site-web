/** Données structurées : un bloc JSON-LD dans la page. `<` est échappé pour
 *  qu'un texte ne puisse pas refermer la balise script. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
