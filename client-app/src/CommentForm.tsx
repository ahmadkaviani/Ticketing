import React, { ChangeEvent, useState } from "react";
import { Segment, Form, Button, FormField, Label, Header, Icon, List } from "semantic-ui-react";
import { ErrorMessage, Field, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import MyTextInput from "./common/form/MyTextInput";
import { useStore } from "./stores/store";
import { observer } from "mobx-react-lite";
import { Comment } from "./Comment";

interface Props {
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
    ticketId: string
}

export default observer(function CommentForm(props: Props) {

    const { commentStore } = useStore();

    const initialState =
    {
        id: '',
        ticketId: props.ticketId,
        text: '',
        creationDate: '',
        userId: ''
    }

    const [comment, setComment] = useState(initialState);

    // files state (attachments)
    const [files, setFiles] = useState<File[]>([]);

    const validationSchema = Yup.object({
        text: Yup.string().required('الزامی')
    })

    // function handleFormSubmit(comment: Comment) {
    //     console.log(comment);
    //     commentStore.create(comment);

    // }


    function handleFormSubmit(values: Comment, formikHelpers: FormikHelpers<Comment>) {
        // If your backend accepts multipart/form-data, send FormData
        const formData = new FormData();
        formData.append("text", values.text);
        formData.append("ticketId", values.ticketId);

        files.forEach((file) => {
            // use the same field name for each file so backend receives an array
            formData.append("attachments", file, file.name);
        });

        // Try to call a store method that handles FormData (you might need to implement it).
        // Fallback: if your store expects a Comment object and separate upload, adapt accordingly.
        if (commentStore.createWithAttachments) {
            // store method that accepts FormData
            commentStore.createWithAttachments(formData).finally(() => {
                formikHelpers.setSubmitting(false);
                formikHelpers.resetForm();
                setFiles([]);
                props.setEditMode(false);
            });
        } else {
            // fallback: create comment first, then upload files separately (example)
            commentStore.create(values).then((created: any) => {
                // if you receive created.id, you can use it to upload files separately
                if (files.length > 0 && commentStore.uploadAttachments) {
                    const uploadForm = new FormData();
                    files.forEach((f) => uploadForm.append("attachments", f, f.name));
                    uploadForm.append("commentId", created.id);
                    commentStore.uploadAttachments(uploadForm);
                }
            }).finally(() => {
                formikHelpers.setSubmitting(false);
                formikHelpers.resetForm();
                setFiles([]);
                props.setEditMode(false);
            });
        }
    }

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const selected = e.target.files;
        if (!selected) return;

        // Convert FileList -> Array and append (avoid duplicates if desired)
        const selectedArray = Array.from(selected);

        // Optional: filter by size/type
        const allowed = selectedArray.filter((f) => f.size <= 10 * 1024 * 1024); // <= 10MB example

        setFiles((prev) => [...prev, ...allowed]);

        // reset the input so the same file can be selected again if removed
        e.currentTarget.value = "";
    }

    function removeFile(index: number) {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    }



 return (
    <Segment clearing>
      <Header content="افزودن پیام جدید" sub color="teal"></Header>

      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={comment}
        onSubmit={(values, helpers) => handleFormSubmit(values, helpers)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty, setFieldValue }) => (
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <MyTextInput name="text" placeholder="متن پیام"></MyTextInput>

            {/* File upload area */}
            <FormField>
              <label htmlFor="file-upload">پیوست فایل‌ها</label>
              <input
                id="file-upload"
                type="file"
                multiple
                onChange={handleFileChange}
                style={{ display: "block", marginTop: 8 }}
              />
              <Label basic color="grey" style={{ marginTop: 8 }}>
                میتوانید چند فایل انتخاب کنید. حداکثر هر فایل 10MB.
              </Label>
            </FormField>

            {/* Selected files list with remove buttons */}
            {files.length > 0 && (
              <Segment>
                <List divided relaxed>
                  {files.map((f, idx) => (
                    <List.Item key={idx} style={{ alignItems: "center", display: "flex", justifyContent: "space-between" }}>
                      <div>
                        <Icon name={f.type.startsWith("image/") ? "image" : "file outline"} />
                        <strong>{f.name}</strong>
                        <div style={{ fontSize: 12, color: "#666" }}>{Math.round(f.size / 1024)} KB</div>
                      </div>
                      <div>
                        <Button size="mini" onClick={() => removeFile(idx)}>حذف</Button>
                      </div>
                    </List.Item>
                  ))}
                </List>
              </Segment>
            )}

            <Button disabled={!isValid || isSubmitting || !dirty} floated="right" positive type="submit" content="ارسال"></Button>
            <Button floated="right" content="انصراف" onClick={() => { props.setEditMode(false); }}></Button>
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
