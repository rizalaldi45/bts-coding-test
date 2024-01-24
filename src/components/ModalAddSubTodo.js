const ModalAddSubTodo = ({ setForm, dataForm, submit, data }) => {
  return (
    <>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box w-6/12 md:w-3/12">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Add Sub Todo on "{data.name}"</h3>
          <input
            type="text"
            placeholder="Add sub to do"
            value={dataForm.itemName}
            className="mt-5 w-full input input-bordered input-sm max-w-xs rounded-md text-xs"
            onChange={({ target }) => setForm({ itemName: target.value })}
          />
          <button
            className="btn btn-sm bg-black text-white rounded-md mt-5 text-xs"
            onClick={() => submit(data.id)}
          >
            Add
          </button>
        </div>
      </dialog>
    </>
  );
};

export default ModalAddSubTodo;
