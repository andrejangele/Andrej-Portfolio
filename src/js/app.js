const burger = document.querySelector(".burger");
const sidebar = document.querySelector("#sidebar");
const links = document.querySelectorAll("#sidebar ul li a");

burger.addEventListener("click", () => {
  sidebar.classList.toggle("is-active");
  burger.classList.toggle("is-active");
});

links.forEach((link) =>
  link.addEventListener("click", () => {
    links.forEach((link) => link.classList.remove("is-active"));
    link.classList.add("is-active");

    sidebar.classList.remove("is-active");
    burger.classList.remove("is-active");
  })
);

// AOS
AOS.init({
  duration: 900,
});

//Submit form to Backend API
const form = document.getElementById("contact-form");
form.onsubmit = function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  fetch("https://us-central1-portfolio-816c0.cloudfunctions.net/sendEmail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "no-cors",
    body: JSON.stringify({
      name,
      email,
      subject,
      message,
    }),
  }).then((res) => {
    if (res.status != 500) {
      alert("Form has been successfully submitted!");
    }
  });
};
