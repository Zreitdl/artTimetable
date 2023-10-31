import { memo, useEffect, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";

import { Student } from "../../utils/appModels";
import AutocompleteTagsInput from "../AutocompleteTagsInput/AutocompleteTagsInput";

interface Props {
  inputHead: string;
  updateData: (data: any) => void;
  buttonText: string;
  projectsOptions: string[];
  initialValues: Student[];
}

const StudentsInput = memo((props: Props) => {
  const { inputHead, updateData, buttonText, projectsOptions, initialValues } = props;
  const [students, setStudents] = useState<Student[]>(initialValues);

  useEffect(() => {
    console.log('update students');
    updateData(students);
  }, [students]);

  const updateTag = (value: string, index: number) => {
    const newTags = students.map((student, i) => {
      if (i === index) {
        student.name = value;
        return student;
      } else {
        return student;
      }
    });
    setStudents(newTags);
  };

  const addTag = () => {
    setStudents((tags) => {
      return [{ name: "", projects: []}, ...tags];
    });
  };

  const removeTag = (index: number) => {
    setStudents((tags) => {
      return tags.slice(0, index).concat(tags.slice(index + 1, tags.length));
    });
  };

  const updateProjectsAtStudent = (index: number, projects: string[]) => {
    console.log('updateProjectsAtStudent');
    const newTags = students.map((student, i) => {
      if (i === index) {
        student.projects = projects;
        return student;
      } else {
        return student;
      }
    });
    setStudents(newTags);
    // setStudents((tags) => {
    //   tags[index].projects = projects;
    //   return tags;
    // });
  };

  return (
    <>
      {students.map((student: Student, index: number) => {
        return (
          <Box
            sx={{
              borderBottom: 1,
              marginBottom: "20px",
              paddingBottom: "20px",
            }}
            key={inputHead + index}
          >
            <Box
              key={"student__" + inputHead + index}
              display={"flex"}
              alignItems={"center"}
            >
              <TextField
                margin="normal"
                fullWidth
                id={inputHead + index}
                label={inputHead}
                value={student.name}
                onChange={(e) => updateTag(e.target.value as string, index)}
              />
              <IconButton
                style={{ marginLeft: "10px" }}
                aria-label="delete"
                onClick={() => {
                  removeTag(index);
                }}
              >
                <DeleteIcon color="warning" />
              </IconButton>
            </Box>
            <Typography
              variant="subtitle1"
              color="inherit"
              noWrap
              margin="0 0 10px 0"
            >
              Stundent's projects:
            </Typography>
            <AutocompleteTagsInput
              updateData={(data) => {
                updateProjectsAtStudent(index, data);
              }}
              initialValues={students[index].projects}
              inputHead={"Assigned projects"}
              buttonText={"+"}
              options={projectsOptions}
            />
          </Box>
        );
      })}
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

export default StudentsInput;
