export function quickSort(array){

    const animations=[];
    if(array.length<=1)
    {
        return array;
    }

    quicksort(array,0,array.length-1,animations);

    return animations;
}

function quicksort(array,low,high,animations)
{
    if(low<high)
    {
        const pi=partition(array,low,high,animations);

        quicksort(array,low,pi-1,animations);
        quicksort(array,pi+1,high,animations);
    }
}

function partition(array,low,high,animations)
{
    const pivot=array[high];
    let i=low-1;

    for(let j=low;j<=high;j++)
    {
        if(array[j]<pivot)
        {
            i++;
    
            swap(i,j,array);
            animations.push([i,array[i]]);
            animations.push([j,array[j]]);
        }
    }

    swap(i+1,high,array);
    animations.push([i+1,array[i+1]]);
    animations.push([high,array[high]]);

    return (i+1);

}

function swap(low,high,array)
{
    const temp=array[low];
    array[low]=array[high];
    array[high]=temp;
}