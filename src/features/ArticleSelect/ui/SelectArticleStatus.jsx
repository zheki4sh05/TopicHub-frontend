import { useTranslation } from "react-i18next";
import statusTypes from "../../../app/util/statusTypes";
import MainSelect from "../../../shared/Select/ui/MainSelect";

function SelectArticleStatus({handleChangeValue}) {
    const {t} = useTranslation()

    const statuses = [
        {
            id:1,
            name:t('on_moderation'),
            value:statusTypes.moderation,
        },
        {
            id:2,
            name:t('on_edit'),
            value:statusTypes.edit,
        },
        {
        id:3,
        name:t('published'),
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