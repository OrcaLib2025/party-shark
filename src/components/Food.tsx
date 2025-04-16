
function Food(){

    const food1 = "Okroshka";
    const food2 = "Water with vinegar"
    return(
        <>
            <ul>
                <li>Apple</li>
                <li>{food1}</li>
                <li>{food2.toLocaleUpperCase()}</li>
            </ul>
        </>

    );
}

export default Food