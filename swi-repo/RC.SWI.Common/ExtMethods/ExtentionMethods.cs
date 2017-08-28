using System;
using System.IO;
using System.IO.Compression;
using System.Security.Cryptography;

namespace RC.SWI.Common.ExtMethods
{
    public static class ExtentionMethods
    {
        public static string ToFileHash(this byte[] file)
        {
            using (var md5 = MD5.Create())
                return BitConverter.ToString(md5.ComputeHash(file)).Replace("-", "").ToLower();
        }

        public static byte[] Compress(this byte[] data)
        {
            var output = new MemoryStream();
            using (var dstream = new DeflateStream(output, CompressionLevel.Optimal))
                dstream.Write(data, 0, data.Length);
            return output.ToArray();
        }

        public static byte[] Decompress(this byte[] data)
        {
            var input = new MemoryStream(data);
            var output = new MemoryStream();
            using (var dstream = new DeflateStream(input, CompressionMode.Decompress))
                dstream.CopyTo(output);
            return output.ToArray();
        }
    }
}
