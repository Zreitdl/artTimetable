import { memo, useEffect, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import Autocomplete from "@mui/joy/Autocomplete";
import { Box, Button, IconButton } from "@mui/material";

interface Props {
  inputHead: string;
  updateData: (data: any) => void;
  buttonText: string;
  options: string[];
  initialValues: string[];
}

const AutocompleteTagsInput = memo((props: Props) => {
  const { inputHead, updateData, buttonText, options, initialValues } = props;
  const [tagsData, setTagsData] = useState<string[]>(initialValues);

  useEffect(() => {
    updateData(tagsData);
  }, [tagsData]);

  const updateTag = (value: string, index: number) => {
    setTagsData((tags) => {
      tags[index] = value;
      return [...tags];
    });
  };

  const addTag = () => {
    setTagsData((tags) => {
      tags.push("");
      return [...tags];
    });
  };

  const removeTag = (index: number) => {
    setTagsData((tags) => {
      return tags.slice(0, index).concat(tags.slice(index + 1, tags.length));
    });
  };

  return (
    <>
      <Box display="flex" flexWrap="wrap" alignItems={"center"}>
        {tagsData.map((value: string, index: number) => {
          return (
            <Box
              key={inputHead + index}
              display={"flex"}
              alignItems={"center"}
              sx={{ margin: "0 20px 5px 0" }}
            >
              <Autocomplete
                sx={{ width: 300 }}
                onChange={(e, value) => updateTag(value as string, index)}
                options={options}
                value={value}
              />
              <IconButton
                aria-label="delete"
                onClick={() => {
                  removeTag(index);
                }}
              >
                <DeleteIcon color="warning" />
              </IconButton>
            </Box>
          );
        })}
      </Box>
      <Box sx={{ mt: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Button variant="outlined" onClick={addTag}>
            {buttonText}
          </Button>
        </Box>
      </Box>
    </>
  );
});

export default AutocompleteTagsInput;
