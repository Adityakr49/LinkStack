import { v2 as cloudinary } from "cloudinary";
import uniqid from "uniqid";

export async function POST(req) {
  // Set up Cloudinary configuration
  const formData = await req.formData();
  if (formData.has("file")) {
    const file = formData.get("file");
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });

    const randomId = uniqid();
    const ext = file.name.split(".").pop();
    const newFilename = randomId + "." + ext;

    // const chunks = [];
    // for await (const chunk of file.stream()) {
    //   chunks.push(chunk);
    // }
    const bufffer = await file.arrayBuffer();
    const bytes = Buffer.from(bufffer);

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: "LinkList", // Define the folder name
          public_id: newFilename, // Specify the file name
          // transformation: [
          //   { aspect_ratio: "21:9", crop: "lfill" },
          //   // Adjust width and height as needed for your banner size
          // ],
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(bytes);
    });
    const link = result?.url;
    return Response.json(link);
  }
}

// export async function UploadImage(file) {
//   const bufffer = await file.arrayBuffer();
//   const bytes = Buffer.from(bufffer);

//   return new Promise(async (resolve, reject) => {
//     await cloudinary.uploader
//       .upload_stream(
//         {
//           resource_type: "auto",
//           folder: folder,
//         },
//         async (err, result) => {
//           if (err) {
//             reject(err.message);
//           }
//           resolve(resolve);
//         }
//       )
//       .end(bytes);
//   });
// }
