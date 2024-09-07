import supabase from "./supabase";

export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) throw new Error("Cabins couldn't be loaded.");
  return cabins;
}

export async function addOrEditCabin(cabin) {
  let baseUrl = `https://vdoyhrhjeiyrolqzdipc.supabase.co/storage/v1/object/public/cabin_images/`;
  let imageName = "";
  const cabinId = cabin?.id;
  if (cabinId && cabin?.image?.startsWith(baseUrl)) {
    baseUrl = cabin.image;
  } else {
    imageName = `${Math.random()}-${cabin.image[0].name}`;
    baseUrl += imageName;
  }

  console.log(cabinId);
  console.log(baseUrl);
  const newCabin = {
    name: cabin.name,
    discount: cabin.discount,
    max_capacity: cabin.maxCapacity,
    regular_price: cabin.regularPrice,
    image: baseUrl,
  };
  let query = supabase.from("cabins");

  if (cabinId) {
    query = query.update(newCabin).eq("id", cabinId);
  } else {
    query = query.insert([newCabin]);
  }
  const { data, error } = await query.select();

  if (error) throw new Error("This cabin couldn't be loaded.");

  if (imageName) {
    const { error: storageErr } = await supabase.storage
      .from("cabin_images")
      .upload(`${imageName}`, cabin.image[0]);

    if (storageErr) {
      await supabase.from("cabins").delete().eq("id", data.id);

      throw new Error("This cabin image couldn't be loaded.");
    }
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) throw new Error("Cabins couldn't be loaded.");

  return data;
}
