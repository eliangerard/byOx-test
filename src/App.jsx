import { useRef, useState } from "react";
import { ScaleLoader } from "react-spinners";
function App() {

  const input = useRef(null);

  const [files, setFiles] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  console.log(files);

  const handleFile = (e) => {
    setData(null);
    setError(null);
    setFiles(e.target.files[0]);

    const formdata = new FormData();
    formdata.append("file", e.target.files[0]);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow"
    };
    setIsLoading(true);
    fetch("http://47.254.124.205/byox/analyze", requestOptions)
      .then(response => response.json())
      .then(result => {
        e.target.value = null;
        console.log(result);
        setIsLoading(false);
        if (result.error) {
          return setError(result.error);
        }
        console.log(result);
        setData(result);
      })
      .catch(error => {
        setIsLoading(false);
        console.log('error', error)
      });
  }

  return (
    <>
      <div className="bg-gray-900 w-full min-h-full flex items-center justify-center flex-col">
        <h1 className="text-4xl font-bold text-white my-4">Analizar</h1>
        <div className="relative bg-gray-600 min-w-[50%] max-w-96 min-h-80 h-fit rounded-xl flex items-center justify-center overflow-hidden relative cursor-pointer transition-all">
          <div className="absolute z-10 w-full h-full flex items-center justify-center transition-all" style={{ backgroundColor: isLoading ? "#000000AA" : "#00000000" }}
            onClick={() => {
              input.current.click();
            }}
          >
            <ScaleLoader color="#0284c7" size={150} style={{ opacity: isLoading ? "100%" : "0%" }} />
          </div>
          {files ? (
            <img src={data ? data.image : URL.createObjectURL(files)} alt={files.name} />
          ) : (
            <svg className="fill-gray-800 w-24 h-24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.0295 15.7412C14.1628 16.2772 14.7052 16.6037 15.2412 16.4705C15.7772 16.3372 16.1037 15.7948 15.9705 15.2588L14.0295 15.7412ZM8.02953 15.2588C7.89631 15.7948 8.2228 16.3372 8.75878 16.4705C9.29476 16.6037 9.83725 16.2772 9.97047 15.7412L8.02953 15.2588ZM12 8.5C11.4477 8.5 11 8.94772 11 9.5C11 10.0523 11.4477 10.5 12 10.5V8.5ZM12.01 10.5C12.5623 10.5 13.01 10.0523 13.01 9.5C13.01 8.94772 12.5623 8.5 12.01 8.5V10.5ZM4.09202 19.782L4.54601 18.891L4.09202 19.782ZM3.21799 18.908L4.10899 18.454L3.21799 18.908ZM20.782 18.908L19.891 18.454L20.782 18.908ZM19.908 19.782L19.454 18.891L19.908 19.782ZM19.908 4.21799L19.454 5.10899L19.908 4.21799ZM20.782 5.09202L19.891 5.54601L20.782 5.09202ZM4.09202 4.21799L4.54601 5.10899L4.09202 4.21799ZM3.21799 5.09202L4.10899 5.54601L3.21799 5.09202ZM12 9.5V11.5C13.1046 11.5 14 10.6046 14 9.5H12ZM12 9.5H10C10 10.6046 10.8954 11.5 12 11.5V9.5ZM12 9.5V7.5C10.8954 7.5 10 8.39543 10 9.5H12ZM12 9.5H14C14 8.39543 13.1046 7.5 12 7.5V9.5ZM12 14.5C13.145 14.5 13.8839 15.1554 14.0295 15.7412L15.9705 15.2588C15.5488 13.5624 13.817 12.5 12 12.5V14.5ZM9.97047 15.7412C10.1161 15.1554 10.855 14.5 12 14.5V12.5C10.183 12.5 8.45119 13.5624 8.02953 15.2588L9.97047 15.7412ZM12 10.5H12.01V8.5H12V10.5ZM6.2 5H17.8V3H6.2V5ZM20 7.2V16.8H22V7.2H20ZM17.8 19H6.2V21H17.8V19ZM4 16.8V7.2H2V16.8H4ZM6.2 19C5.62345 19 5.25117 18.9992 4.96784 18.9761C4.69617 18.9539 4.59545 18.9162 4.54601 18.891L3.63803 20.673C4.01641 20.8658 4.40963 20.9371 4.80497 20.9694C5.18864 21.0008 5.65645 21 6.2 21V19ZM2 16.8C2 17.3436 1.99922 17.8114 2.03057 18.195C2.06287 18.5904 2.13419 18.9836 2.32698 19.362L4.10899 18.454C4.0838 18.4045 4.04612 18.3038 4.02393 18.0322C4.00078 17.7488 4 17.3766 4 16.8H2ZM4.54601 18.891C4.35785 18.7951 4.20487 18.6422 4.10899 18.454L2.32698 19.362C2.6146 19.9265 3.07354 20.3854 3.63803 20.673L4.54601 18.891ZM20 16.8C20 17.3766 19.9992 17.7488 19.9761 18.0322C19.9539 18.3038 19.9162 18.4045 19.891 18.454L21.673 19.362C21.8658 18.9836 21.9371 18.5904 21.9694 18.195C22.0008 17.8114 22 17.3436 22 16.8H20ZM17.8 21C18.3436 21 18.8114 21.0008 19.195 20.9694C19.5904 20.9371 19.9836 20.8658 20.362 20.673L19.454 18.891C19.4045 18.9162 19.3038 18.9539 19.0322 18.9761C18.7488 18.9992 18.3766 19 17.8 19V21ZM19.891 18.454C19.7951 18.6422 19.6422 18.7951 19.454 18.891L20.362 20.673C20.9265 20.3854 21.3854 19.9265 21.673 19.362L19.891 18.454ZM17.8 5C18.3766 5 18.7488 5.00078 19.0322 5.02393C19.3038 5.04612 19.4045 5.0838 19.454 5.10899L20.362 3.32698C19.9836 3.13419 19.5904 3.06287 19.195 3.03057C18.8114 2.99922 18.3436 3 17.8 3V5ZM22 7.2C22 6.65645 22.0008 6.18864 21.9694 5.80497C21.9371 5.40963 21.8658 5.01641 21.673 4.63803L19.891 5.54601C19.9162 5.59545 19.9539 5.69617 19.9761 5.96784C19.9992 6.25117 20 6.62345 20 7.2H22ZM19.454 5.10899C19.6422 5.20487 19.7951 5.35785 19.891 5.54601L21.673 4.63803C21.3854 4.07354 20.9265 3.6146 20.362 3.32698L19.454 5.10899ZM6.2 3C5.65645 3 5.18864 2.99922 4.80497 3.03057C4.40963 3.06287 4.01641 3.13419 3.63803 3.32698L4.54601 5.10899C4.59545 5.0838 4.69617 5.04612 4.96784 5.02393C5.25117 5.00078 5.62345 5 6.2 5V3ZM4 7.2C4 6.62345 4.00078 6.25117 4.02393 5.96784C4.04612 5.69617 4.0838 5.59545 4.10899 5.54601L2.32698 4.63803C2.13419 5.01641 2.06287 5.40963 2.03057 5.80497C1.99922 6.18864 2 6.65645 2 7.2H4ZM3.63803 3.32698C3.07354 3.6146 2.6146 4.07354 2.32698 4.63803L4.10899 5.54601C4.20487 5.35785 4.35785 5.20487 4.54601 5.10899L3.63803 3.32698Z" />
            </svg>
          )}
          <input ref={input} type="file" className="hidden"
            onChange={handleFile}
            accept="image/*"
            disabled={isLoading}
          />
        </div>
        {error && <p className="text-white font-bold my-2">{error}</p>}
        {/* <div className="w-96 bg-gray-800 h-fit rounded-xl p-4 mt-4 transition-all">
          {data && (
            <>
              <h2 className="text-white text-2xl font-bold">Resultados</h2>
              {data.map((item, index) => (
                <div key={index}>
                  <p className="text-white font-semibold text-xl">Rostro #{(index + 1)}: {item.dominant_emotion}</p>
                </div>
              ))}
            </>
          )}
        </div> */}
      </div>
    </>
  )
}

export default App
