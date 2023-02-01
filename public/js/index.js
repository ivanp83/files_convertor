const form = document.getElementById("form-send-files");

form.addEventListener("submit", onSubmit);

async function onSubmit(event) {
  event.preventDefault();
  try {
    let formData = new FormData();

    Array.from(event.target[0].files).forEach((element) =>
      formData.append("file", element)
    );
    const res = await fetch(
      "http://localhost:3000/api/files/upload?format=webp",
      {
        method: "POST",
        body: formData,
      }
    );
  } catch (error) {
    console.log(error);
  }

  //   let result = await response.json();
  //   let formData = new FormData();
  //   formData.append("firstName", "John");
  //   formData.append("image", imageBlob, "image.png");

  //   let response = await fetch("http://localhost:3000/api/files/upload", {
  //     method: "POST",
  //     body: formData,
  //   });
  //   let result = await response.json();
  //   alert(result.message);
}
console.log("hello");
