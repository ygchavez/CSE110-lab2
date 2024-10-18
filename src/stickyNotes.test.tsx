import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
test("renders create note form", () => {
 render(<StickyNotes />);
 const createNoteButton = screen.getByText("Create Note");
 expect(createNoteButton).toBeInTheDocument();
});


describe("Create StickyNote", () => {
    test("renders create note form", () => {
      render(<StickyNotes />);
   
      const createNoteButton = screen.getByText("Create Note");
      expect(createNoteButton).toBeInTheDocument();
    });
   
    test("creates a new note", () => {
      render(<StickyNotes />);
   
   // Please make sure your sticky note has a title and content input field with the folTlowing placeholders.
      const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
      const createNoteContentTextarea =
        screen.getByPlaceholderText("Note Content");
      const createNoteButton = screen.getByText("Create Note");
   
      fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
      fireEvent.change(createNoteContentTextarea, {
        target: { value: "Note content" },
      });
      fireEvent.click(createNoteButton);
   
      const newNoteTitle = screen.getByText("New Note");
      const newNoteContent = screen.getByText("Note content");
   
      expect(newNoteTitle).toBeInTheDocument();
      expect(newNoteContent).toBeInTheDocument();
    });

    //Read: Are all the notes that are created displayed on the page
    test("Display all created notes", () => {
      render(<StickyNotes />);

    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentText = screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    fireEvent.change(createNoteTitleInput, { target: { value: "Note 1" } });
    fireEvent.change(createNoteContentText, { target: { value: "Content 1" } });
    fireEvent.click(createNoteButton);

    expect(screen.getByText("Note 1")).toBeInTheDocument();
    expect(screen.getByText("Content 1")).toBeInTheDocument();
    });

    //Update: Once the update is done, is the document object value updating.
    test("Display updated object value after updating", () => {
      render(<StickyNotes />);

    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]);

    const titleInput = screen.getByPlaceholderText('Note Title');
    const contentInput = screen.getByPlaceholderText('Note Content');

    fireEvent.change(titleInput, {target: { value: 'Updated Title' } });
    fireEvent.change(contentInput, {target: { value: 'Updated Content' } });

    const saveButton = screen.getByText('Create Note');
    fireEvent.click(saveButton);

    expect(screen.getByText('Updated Title')).toBeInTheDocument(); 
    expect(screen.getByText('Updated Content')).toBeInTheDocument();

    });

  //Delete: Does the note get filtered out once the `x` button is pressed	

  test("Deletes note when x is clicked", () => {
    render(<StickyNotes />);

    expect(screen.getByText('test note 1 title')).toBeInTheDocument();
    const deleteButton = screen.getAllByText('x')[0];
    fireEvent.click(deleteButton);

    expect(screen.queryByText('test note 1 title')).not.toBeInTheDocument();

  });

});







   
