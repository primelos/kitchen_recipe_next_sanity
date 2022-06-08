/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useRouter } from "next/router";
import {
  sanityClient,
  usePreviewSubscription,
  urlFor,
  PortableText,
} from "../../lib/sanityClient";

const recipesQuery = `*[_type == "recipe" && slug.current == $slug][0]{
  _id,
  name,
  slug,
  mainImage,
  ingredient[]{
    _key,
    unit,
    wholeNumber,
    fraction,
    ingredient->{
      name
    }
  },  
 instructions,
 likes,
}`;

export default function OneRecipe({ data }) {
  const { recipe } = data;

  const [likes, setLikes] = useState(data?.recipe?.likes);
  const router = useRouter();

  if (!data) {
    return <div>Loading...</div>;
  }

  const addLike = async () => {
    const res = await fetch("/api/handle-like", {
      method: "POST",
      body: JSON.stringify({
        _id: recipe._id,
      }),
    }).catch((error) => console.log(error));

    const dataLikes = await res.json();
    setLikes(dataLikes.likes);
  };

  return (
    <article className="recipe">
      <h1>{recipe.name}</h1>
      <button className="like-button" onClick={addLike}>
        {likes} ❤️
      </button>
      <main className="content">
        <img src={urlFor(recipe?.mainImage).url()} alt={recipe.name} />
        <div className="breakdown">
          <ul className="ingredients">
            {recipe.ingredient?.map((ingredient) => (
              <li key={ingredient._key} className="ingredient">
                {ingredient?.wholeNumber}
                {ingredient?.fraction} {ingredient?.unit}
                <br />
                {ingredient?.ingredient?.name}
              </li>
            ))}
          </ul>
          <div>
            <PortableText
              value={recipe?.instructions}
              className="instructions"
            />
          </div>
        </div>
      </main>
    </article>
  );
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    `*[_type == 'recipe' && defined(slug.current)]{
      'params': {
        'slug': slug.current
      }
    }`
  );
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const recipe = await sanityClient.fetch(recipesQuery, { slug });
  return { props: { data: { recipe }, preview: true } };
}
