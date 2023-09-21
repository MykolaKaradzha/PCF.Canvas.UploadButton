import * as React from "react";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { IIconProps } from "@fluentui/react";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { IOutputs } from "./generated/ManifestTypes";
import { IAppState } from "./interfaces/IAppState";
import { ArrowAutofitWidthDotted24Regular } from "@fluentui/react-icons";

type ButtonControlProps = {
  updateOutputs: (fileData: IOutputs) => void;
};

export function ButtonControl({ updateOutputs }: ButtonControlProps) {
  const onFileChange = async (event: any) => {
    const file = event.target.files[0];
    toBase64(file)
      .then((base64) => {
        if (typeof base64 === "string") {
          updateOutputs({
            fileName: file.name,
            base64: base64,
            MIMEType: file.type,
          });
        }
      })
      .catch((error) => {
        throw new Error(error);
      });

    // Here you can send the file to the server or process it as required
  };

  const toBase64 = async (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onabort = () => reject();
      reader.onerror = (error) => reject(error);
    });

  const openFileDialog = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".doc,.docx,image/*"; // Accepts Word files and images
    fileInput.onchange = onFileChange;
    fileInput.click(); // Open the dialog
  };
  const addIcon: IIconProps = { iconName: "Upload" };

  return (
    <FluentProvider theme={webLightTheme}>
      <DefaultButton iconProps={addIcon} onClick={openFileDialog}>
        Upload
      </DefaultButton>
    </FluentProvider>
  );
}
