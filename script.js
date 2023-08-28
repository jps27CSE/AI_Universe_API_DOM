const fetchData = async (isShowAll) => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;

  const fetchData = await fetch(url);
  const data = await fetchData.json();
  showCard(data.data.tools, isShowAll);
};

const showCard = (data, isShowAll) => {
  console.log(data);

  const card_container = document.getElementById("card_container");
  card_container.textContent = "";

  const show_All_container = document.getElementById("show_all");

  if (data.length > 6 && !isShowAll) {
    show_All_container.classList.remove("hidden");
  } else {
    show_All_container.classList.add("hidden");
  }

  if (!isShowAll) {
    data = data.slice(0, 6);
  }

  data.forEach((card) => {
    const cardContain = document.createElement("div");
    const featuresList = card.features
      .map((feature) => `<li>${feature}</li>`)
      .join("");
    cardContain.innerHTML = `
    <div class="card w-96 bg-base-100 shadow-xl">
    <figure>
      <img
        // src="${card?.image}"
        alt="Shoes"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title">Features</h2>
      <ul class="list-decimal">
      ${featuresList}
      </ul>

      <hr />

      <h3 class="text-xl font-bold">${card.name}</h3>
      <p>${card.published_in}</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary" onclick="showALlDetailsFetch('${card.id}')" >></button>
      </div>
    </div>
  </div>
    `;

    card_container.appendChild(cardContain);
  });
};

const showAll = () => {
  fetchData(true);
};

const showALlDetailsFetch = async (card_parameter) => {
  const fetchingData = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${card_parameter}`
  );

  const data = await fetchingData.json();

  modalFunction(data.data);
};

const modalFunction = (data) => {
  console.log(data);

  const modalInfos = document.getElementById("modal_infos");

  let featuresList = "";
  for (const key in data.features) {
    if (data.features.hasOwnProperty(key)) {
      featuresList += `<li>${data.features[key].feature_name}</li>`;
    }
  }

  const integrations_array = data.integrations
    .map((singleData) => `<li>${singleData}</li>`)
    .join("");

  modalInfos.innerHTML = `    
  
  <div
  class="border-2 border-solid border-rose-500 p-10 mr-5 rounded-lg"
>
  <p class="text-xl font-bold">
    ${data.description}
  </p>

  <div class="flex flex-row">
    <div
      class="border-2 text-sm text-green-600 font-bold p-2 rounded-lg"
    >
        ${data.pricing[0].plan}
        ${data.pricing[0].price}
    </div>
    <div
      class="border-2 text-sm text-orange-600 font-bold p-2 rounded-lg"
    >
    ${data.pricing[1].plan}
    ${data.pricing[1].price}
    </div>
    <div
      class="border-2 text-sm text-red-600 font-bold p-2 rounded-lg"
    >
    ${data.pricing[2].plan}
    ${data.pricing[2].price}
    </div>
  </div>

  <div class="flex flex-row justify-between">
    <div>
      <h1>Features</h1>
      <ul class="list-decimal">
       ${featuresList}
      </ul>
    </div>
    <div class="p-2 ml-2">
      <h1>Integrations</h1>

      <ul class="list-decimal">
          ${integrations_array}
      </ul>
    </div>
  </div>
</div>
<div
  class="border-2 border-solid border-rose-500 p-10 relative rounded-lg"
>
  <p
    class="absolute flex justify-end text-white bg-red-500 rounded-lg"
  >
    94% accuracy
  </p>
  <img
    class=""
    src="${data.image_link[0] || data.image_link[1]}"
    alt=""
  />

  <p class="text-2xl font-bold">Hi, how are you doing today?</p>
  <p>
    I'm doing well, thank you for asking. How can I assist you
    today?
  </p>
</div>`;

  showDetails.showModal();
};

fetchData();
