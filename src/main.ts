/* SNACK 1* 
📌 Milestone 1
Crea un type alias Person per rappresentare una persona generica.

Il tipo deve includere le seguenti proprietà:
- id: numero identificativo, non modificabile
- name: nome completo, stringa non modificabile
- birth_year: anno di nascita, numero
- death_year: anno di morte, numero opzionale
- biography: breve biografia, stringa
- image: URL dell'immagine, stringa
*/

type Person = {
  readonly id: number,
  readonly name: string,
  birth_year: number,
  death_year?: number,
  biography: string,
  image: string,
}

/* SNACK-2 *
📌 Milestone 2
Crea un type alias Actress che oltre a tutte le proprietà di Person,
 aggiunge le seguenti proprietà:

- most_famous_movies: una tuple di 3 stringhe
- awards: una stringa
- nationality: una stringa tra un insieme definito di valori.
Le nazionalità accettate sono: American, British, Australian, Israeli-American, South African, 
French, Indian, Israeli, Spanish, South Korean, Chinese. */

type Actress = Person & {
  most_famous_movies: [string, string, string],
  awards: string;
  nationality:
  | "American"
  | "British"
  | "Australian"
  | "Israeli-American"
  | "South African"
  | "French"
  | "Indian"
  | "Israeli"
  | "Spanish"
  | "South Korean"
  | "Chinese"
}

/* SNACK-3*

Crea una funzione getActress che, dato un id, effettua una chiamata a:

GET /actresses/:id
La funzione deve restituire l’oggetto Actress, se esiste, oppure null se non trovato.

Utilizza un type guard chiamato isActress per assicurarti che la struttura del dato ricevuto sia corretta. */

function isActress(data: unknown): data is Actress {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  return (

    "id" in data && typeof data.id === "number" &&
    "name" in data && typeof data.name === "string" &&
    "birth_year" in data && typeof data.birth_year === "number" &&
    (!("death_year" in data) || typeof data.death_year === "number") &&
    "biography" in data && typeof data.biography === "string" &&
    "image" in data && typeof data.image === "string" &&
    "most_famous_movies" in data && Array.isArray(data.most_famous_movies) && data.most_famous_movies.length === 3 &&
    data.most_famous_movies.every(movie => typeof movie === "string") &&
    "awards" in data && typeof data.awards === "string" &&
    "nationality" in data && typeof data.nationality === "string"

  );
}

async function getActress(id: number): Promise<Actress | null> {

  try {
    const response = await fetch(`http://localhost:3333/actresses/${id}`);
    if (!response.ok) {
      return null;
    }
    //se la risposta è andata a buon fine raccolgo il risultato
    const data: unknown = await response.json();

    if (!isActress(data)) {
      throw new Error("Formato dati non valido");
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Errore durante il recupero dei dati", error);
    } else {
      console.error("Errore sconosciuto", error);
    }
    return null;

  }
}