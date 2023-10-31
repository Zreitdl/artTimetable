import { Box, Button, IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { memo, useContext, useEffect, useState } from "react";

interface Props {
  inputHead: string;
  updateData: (data: any) => void;
  buttonText: string;
  initialValues: any;
}

const TagsInput = memo((props: Props) => {
  const { inputHead, updateData, buttonText, initialValues } = props;
  const [tagsData, setTagsData] = useState<string[]>(initialValues);

  // useEffect(() => {
  //   setTagsData(props.initialValues);
  // }, [props.initialValues]);

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
              sx={{ margin: "0 20px 5px 0" }}
              key={inputHead + index}
              display={"flex"}
              alignItems={"center"}
            >
              <TextField
                margin="normal"
                sx={{ width: "300px" }}
                id={inputHead + index}
                label={inputHead}
                value={value}
                onChange={(e) => updateTag(e.target.value as string, index)}
              />
              <IconButton
                style={{ marginLeft: "5px" }}
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

export default TagsInput;
