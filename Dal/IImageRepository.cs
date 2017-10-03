using System;
using System.Collections.Generic;

namespace Dal
{
    public interface IImageRepository
    {
        IEnumerable<Image> GetSequence(int offset, int count);
    }
}
