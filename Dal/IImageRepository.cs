using System;
using System.Collections.Generic;

namespace Dal
{
    public interface IImageRepository
    {
        int Count { get; }

        IEnumerable<Image> GetSequence(int offset, int count);
    }
}
