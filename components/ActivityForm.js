import useSWR from "swr";
import { countries } from "@/lib/countries";

export default function ActivityForm() {
  const { data, isLoading, error } = useSWR("/api/categories");

  if (isLoading) {
    return (
      <form>
        <fieldset>
          <legend>Add Activity</legend>
          <p>Loading categories...</p>
        </fieldset>
      </form>
    );
  }

  if (!data || error) {
    return (
      <form>
        <fieldset>
          <legend>Add Activity</legend>
          <p>An error occured while fetching the activities.</p>
        </fieldset>
      </form>
    );
  }

  console.log(data);

  return (
    <form>
      <fieldset>
        <legend>Add Activity</legend>
        <section>
          <label htmlFor="title">
            Title<span aria-hidden>*</span>
          </label>
          <br />
          <input type="text" id="title" name="title" required />
        </section>
        <section>
          <label htmlFor="description">Description</label>
          <br />
          <textarea id="description" name="description"></textarea>
        </section>
        <section>
          <label htmlFor="categories">
            Categories<span aria-hidden>*</span>
          </label>
          <br />
          <select id="categories" name="categories" multiple required>
            <option value="" disabled>
              Please select at least one category
            </option>
            {data.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </section>
        <section>
          <label htmlFor="country">Country</label>
          <br />
          <select id="country" name="country">
            <option value="">Please select a country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </section>
        <section>
          <label htmlFor="area">Area</label>
          <br />
          <input type="text" id="area" name="area" />
        </section>
        <section>
          <button type="submit">Submit</button>
        </section>
      </fieldset>
    </form>
  );
}
