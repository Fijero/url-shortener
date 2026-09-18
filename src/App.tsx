import { useState } from "react";
import { shortenUrl } from "./api/shorten";
import "./index.css";
import { Button } from "./components/ui/button";
import { Spinner } from "./components/ui/spinner";
import { Copy } from "lucide-react";
import { toast } from "./components/ui/toast";

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [inputText, setInputText] = useState<string>("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const shortenedUrl = await shortenUrl(inputText);
      setIsLoading(false);
      setShortenedUrl(shortenedUrl!);
    } catch (error) {
      setShortenedUrl(null);
      setIsLoading(false);
      setErrorMsg("Error Occurred!");
    }
  }

  return (
    <div className="flex flex-col items-center p-10">
      <p className="text-amber-50 text-center text-5xl"> SHORTEN YOUR URL</p>

      <p className="text-sm text-green-600 my-2">
        ...Paste your URL below to get a short one instantly..
      </p>

      <div className="my-10"></div>
      <div className="text-amber-50">
        <form
          method="POST"
          className="flex flex-col justify-center items-center"
          onSubmit={handleSubmit}
        >
          <div className="w-2xl">
            <input
              type="url"
              className="w-full h-12 px-3 border border-b-amber-50 outline-0"
              required
              placeholder="Paste your long URL"
              onChange={(e) => {
                const val = e.target.value;
                setInputText(val);
              }}
            />
          </div>

          <div className="my-2.5"></div>

          <Button
            type="submit"
            className="text-amber-200 bg-amber-800 p-5 border-amber-50 border"
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner /> : "Shorten URL"}
          </Button>

          <div className="my-5"></div>

          {shortenedUrl != null || "" ? (
            <div className="flex flex-col justify-center items-center">
              <p>Click to Copy your short link: </p>
              <div className="flex flex-row items-center justify-center">
                <span
                  id="shortLinkUrl"
                  className="text-green-600 cursor-copy"
                  onClick={copyShortLink}
                >
                  {shortenedUrl}
                </span>
                <span className="m-3">
                  <Copy onClick={copyShortLink} />
                </span>
              </div>
            </div>
          ) : null}

          {errorMsg !== null || "" ? (
            <div className="flex flex-col justify-center items-center">
              <p className="text-red-600"> {errorMsg}</p>
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex flex-row items-center">
      <Spinner />

      <p className="m-2">Generating URL</p>
    </div>
  );
}

function copyShortLink() {
  const linkCont = document.getElementById("shortLinkUrl")?.innerText;

  navigator.clipboard.writeText(linkCont ?? "");

  toast.add({
    description: "Your link has been copied 👌",
    type: "success",
  });
}
