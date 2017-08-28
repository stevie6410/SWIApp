namespace RC.SWI.ViewModels.ViewModels
{
    public class FileVM
    {
        public string Data { get; set; }

        public FileVM(string file)
        {
            Data = file;
        }
    }
}
