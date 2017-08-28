namespace RC.SWI.Common.DTO
{
    public class FileDTO
    {
        public string Data { get; set; }

        public FileDTO(string file)
        {
            if (file == null) return;
            Data = file;
        }
    }
}
