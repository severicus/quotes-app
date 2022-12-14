const update = document.querySelector("#update-button");
update.addEventListener("click", (_) => {
  fetch("/quotes", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Luke SkyWalker",
      quote:
        "'If there's a bright center to the universe, you're on the planet that it's farthest from.'",
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => console.log(response));
});

const deleteButton = document.querySelector("#delete-button");
const messageDiv = document.querySelector("#message");

deleteButton.addEventListener("click", (_) => {
  fetch("/quotes", {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Darth Vadar",
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      if (response === "No quote to delete") {
        messageDiv.textContent = "No Darth Vadar quote to delete";
      } else {
        window.location.reload(true);
      }
    })
    .catch(console.error);
});
