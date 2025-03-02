import statusTypes from "../../../app/util/statusTypes";
import MainSelect from "../../../shared/Select/ui/MainSelect";

function SelectArticleStatus({handleChangeValue}) {

    const statuses = [
        {
            id:1,
            name:"На модерации",
            value:statusTypes.moderation,
        },
        {
            id:2,
            name:"Редактирование",
            value:statusTypes.edit,
        },
        {
        id:3,
        name:"Опубликованы",
        value:statusTypes.publish
        }
    ]

    const handleStatusChange=(id)=>{
        const obj = statuses.find(item=>item.id==id)
        handleChangeValue(obj.value)
    }

    return ( 

        <MainSelect
        
        title={"Выберите статус"}
        list={statuses}
        handleChange={handleStatusChange}
        defaultValue={statuses[2].id}

        />
     );
}

export default SelectArticleStatus;