import { memo, useEffect, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { uid } from "uid";

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
  const { inputHead, updateData, buttonText, projectsOptions, initialValues } =
    props;
  const [students, setStudents] = useState<Student[]>(initialValues);

  useEffect(() => {
    // console.log("update students");
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
      return [
        ...tags,
        {
          name: "",
          projects: [],
          restrictionsHours: "",
          id: uid(),
        },
      ];
    });
  };

  const removeTag = (index: number) => {
    setStudents((tags) => {
      return tags.slice(0, index).concat(tags.slice(index + 1, tags.length));
    });
  };

  const updateProjectsAtStudent = (index: number, projects: string[]) => {
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

  const updateHoursAtStudent = (index: number, value: string) => {
    const newTags = students.map((student, i) => {
      if (i === index) {
        student.restrictionsHours = value;
        return student;
      } else {
        return student;
      }
    });
    setStudents(newTags);
  };

  return (
    <>
      {students.map((student: Student, index: number) => {
        return (
          <Box
            sx={{
              padding: 2,
              my: 2,
              "&:nth-of-type(2n)": { backgroundColor: "#e1f5fe52", border: '1px solid #81d4fa', borderRadius: 2 },
            }}
            key={"student__" + student.id}
          >
            <Box display={"flex"} alignItems={"center"}>
              <TextField
                fullWidth
                sx={{mb: 2}}
                id={inputHead + index}
                label={inputHead}
                value={student.name}
                onChange={(e) => updateTag(e.target.value as string, index)}
              />
              <IconButton
                style={{ marginLeft: 1 }}
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
            <Typography
              variant="subtitle1"
              color="inherit"
              noWrap
              sx={{ marginTop: 1 }}
            >
              Stundent's restrictions hours:
            </Typography>
            <TextField
              margin="normal"
              fullWidth
              id={inputHead + index + "hours"}
              label={"Hours"}
              value={student.restrictionsHours}
              onChange={(e) =>
                updateHoursAtStudent(index, e.target.value as string)
              }
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
