import React, {useState} from "react";
import initialMenu from '../modal/menu.js'

const AdminPage = () => {
    const [title, setTitle] = useState('')
    const [descr, setDescr] = useState('')
    const [price, setPrice] = useState('')
    const [menu, setMenu] = useState(() => {
        const savedMenu = localStorage.getItem('menuItems')
        return savedMenu ? JSON.parse(savedMenu) : initialMenu
    })

    const [editId, setEditId] = useState(null)
    const [editTitle, setEditTitle] = useState('')
    const [editDescr, setEditDescr] = useState('')
    const [editPrice, setEditPrice] = useState('')

    const startEdit = (item) => {
        setEditId(item.id)
        setEditTitle(item.title)
        setEditDescr(item.descr)
        setEditPrice(item.price)
    }

    const handleSaveEdit = (id) => {
        const updateItem = menu.map((item) => {
            if (item.id === id) {
                return {...item, title: editTitle, descr: editDescr, price: editPrice}
            }
            return item
        })
        setMenu(updateItem)
        localStorage.setItem('menuItems', JSON.stringify(updateItem))
        setEditId(null)
    }

    const handleDeleted = (id) => {
        const filterMenu = menu.filter((item) => item.id !== id)
        setMenu(filterMenu)
        localStorage.setItem('menuItems', JSON.stringify(filterMenu))
    }

    const handleAddDish = () => {
        if (!title || !descr || !price) {
            alert('Заполните все поля, чтобы добавить блюдо!')
            return
        }

        const newDish = {
            id: Date.now(),
            title: title,
            descr: descr,
            price: price,
        }

        const updateMenu = [...menu, newDish]

        setMenu(updateMenu)
        localStorage.setItem('menuItems', JSON.stringify(updateMenu))

        setTitle('');
        setDescr('');
        setPrice('');
    }



    const renderMenu = () => {
        return (
            <div className="admin-grid">
                {menu.map((item) => {
                    if (item.id === editId) {
                        return (
                            <div key={item.id} className="dish-card edit-mode">
                                <h1>Изменить блюдо</h1>
                                <div className="edit-fields">
                                    <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)}
                                           placeholder={"Название блюда"}/>
                                    <input value={editDescr} onChange={(e) => setEditDescr(e.target.value)}
                                           placeholder={'Описание'}/>
                                    <input value={editPrice} onChange={(e) => setEditPrice(e.target.value)}
                                           placeholder={"Цена"}/>
                                </div>
                                <div className="edit-actions card-buttons">
                                    <button onClick={() => handleSaveEdit(item.id)}>Сохранить</button>
                                    <button onClick={() => setEditId(null)}>Отмена</button>
                                </div>
                            </div>
                        );
                    }
                    return (
                        <div key={item.id} className="dish-card">
                            <h1>{item.title}</h1>
                            <p>{item.descr}</p>
                            <p>
                                <span className="dish-price">{item.price}</span>
                                <span className="dish-price-currency">₸</span>
                            </p>
                            <div className="card-buttons">
                                <button onClick={() => startEdit(item)}>Изменить</button>
                                <button onClick={() => handleDeleted(item.id)}>Удалить</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="admin-page">
            <div className="admin-header">
                <span className="section-eyebrow">Управление</span>
                <h1>Меню ресторана</h1>
            </div>
            <div className="dish-card edit-mode" style={{ marginBottom: '40px' }}>
                <h1>Добавить новое блюдо</h1>
                <div className="edit-fields">
                    <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Название нового блюда" />
                    <input value={descr} onChange={(e) => setDescr(e.target.value)} placeholder="Описание блюда" />
                    <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Цена" />
                </div>
                <div className="edit-actions card-buttons">
                    <button onClick={handleAddDish}>Добавить в меню</button>
                </div>
            </div>
            {renderMenu()}
        </div>
    )
}

export default AdminPage;