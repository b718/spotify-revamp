export async function getArtistInfo(artistName: string) {
  if (artistName === "Drake") {
    artistName = "Drake (musician)";
  }
  const url = `https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(
    artistName
  )}&format=json&origin=*`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const parser = new DOMParser();
    const doc = parser.parseFromString(data.parse.text["*"], "text/html");

    const refs = doc.querySelectorAll(".reference");
    refs.forEach((ref) => ref.remove());

    const links = doc.querySelectorAll("a");
    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (href?.startsWith("/wiki/")) {
        link.setAttribute("href", `https://wikipedia.org${href}`);
      }
    });

    const allParagraphs = doc.querySelectorAll("p");

    const firstParagraphs = Array.from(allParagraphs)
      .filter((p) => {
        const text = p.textContent?.trim();
        return text && text.length > 0;
      })
      .slice(0, 2)
      .map((p) => p.outerHTML)
      .join("");

    return `<div class="bio-content">${firstParagraphs}</div>`;
  } catch (error) {
    console.error("Error fetching artist info:", error);
    return "";
  }
}
