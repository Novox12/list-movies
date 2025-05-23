import styled from './index.module.css';
import { Button, Card, Search } from "./components";
import { useEffect, useState } from 'react';
import type { Movie } from './interfaces';
import { loadMovies } from './utils/loadMovies';
import { TbMovieOff } from 'react-icons/tb';
import { resetData } from './utils/resetData';
import Modal from 'react-modal';
import Cropper, { type Area } from 'react-easy-crop';
import { getCroppedImg } from './utils/cropImage';
import { HiOutlineFilter } from 'react-icons/hi';

Modal.setAppElement('#root');

function App() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
    const [movieSelect, setMovieSelect] = useState<number>(0);
    const [triger, setTriger] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [sortMode, setSortMode] = useState<'none' | 'asc' | 'desc'>('none');
    const [originalMovies, setOriginalMovies] = useState<Movie[]>([]);


    useEffect(() => {
        const allMovies = loadMovies();
        setMovies(allMovies);
        setOriginalMovies(allMovies);
        setFilteredMovies(allMovies);
    }, [triger]);

    const handleSearch = (term: string) => {
        if (term.trim() === '') {
            setFilteredMovies(movies);
            return;
        }

        const filtered = movies.filter(movie =>
            movie.title.toLowerCase().includes(term.toLowerCase())
        );

        setMovieSelect(0);
        setFilteredMovies(filtered);
    };

    const handleReset = () => {
        resetData();
        setMovieSelect(0);
        setTriger(!triger);
    };

    const handleSelect = (movie: number) => {
        setMovieSelect(movie);
    };

    const handleDelete = (movie: number) => {
        const dataMovies = loadMovies();
        dataMovies.splice(movie, 1);
        localStorage.setItem('listMoviesData', JSON.stringify(dataMovies));
        setTriger(!triger);
        if (movieSelect === movie) {
            setMovieSelect(0);
        } else if (movieSelect > movie) {
            setMovieSelect((prev) => prev - 1);
        }
    };

    const handleCreate = () => {
        setIsEditing(false);
        setEditIndex(null);
        setTitle('');
        setDate('');
        setImage(null);
        setIsModalOpen(true);
    };

    const handleEdit = (index: number) => {
        const movieToEdit = filteredMovies[index];
        setTitle(movieToEdit.title);
        setDate(movieToEdit.date);
        setImage(movieToEdit.img);
        setEditIndex(index);
        setIsEditing(true);
        setIsModalOpen(true);
    };


    const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => setImage(reader.result as string);
        }
    };

    const handleSaveMovie = async () => {
        if (!title || !date ||!image) return;

        let finalImage = image;

        if (image && croppedAreaPixels) {
            finalImage = await getCroppedImg(image, croppedAreaPixels);
        }

        const newMovie: Movie = {
            title,
            date,
            img: finalImage!,
        };

        const updatedMovies = [...movies];

        if (isEditing && editIndex !== null) {
            const globalIndex = movies.findIndex(m => m.title === filteredMovies[editIndex].title && m.date === filteredMovies[editIndex].date);
            if (globalIndex !== -1) {
                updatedMovies[globalIndex] = newMovie;
            }
        } else {
            updatedMovies.push(newMovie);
        }

        localStorage.setItem('listMoviesData', JSON.stringify(updatedMovies));
        setTriger(!triger);
        setIsModalOpen(false);
        setTitle('');
        setDate('');
        setImage(null);
        setEditIndex(null);
        setIsEditing(false);
    };

    const handleOrder = () => {
        let nextMode: typeof sortMode;
        let sorted: Movie[];

        if (sortMode === 'none') {
            sorted = [...filteredMovies].sort((a, b) => a.date.localeCompare(b.date));
            nextMode = 'asc';
        } else if (sortMode === 'asc') {
            sorted = [...filteredMovies].sort((a, b) => b.date.localeCompare(a.date));
            nextMode = 'desc';
        } else {
            sorted = [...originalMovies];
            nextMode = 'none';
        }

        setFilteredMovies(sorted);
        setSortMode(nextMode);
    };

    const handleSaveMovieCancel = () => {
        setIsModalOpen(false);
        setTitle('');
        setDate('');
        setImage(null);
    }

    return (
        <>
            <header className={styled.containerNav}>
                <h1 className={styled.logo}>List Movies</h1>

                {movies.length ? (
                    <div className={styled.searchContentDisplay}>
                        <Search onSearch={handleSearch} />
                    </div>
                ) : null}

                <div className={styled.containerButtons}>
                    <Button text='Reset' action={handleReset} />
                    <Button text='Create Movie' action={handleCreate} />
                </div>
            </header>

            {movies.length && filteredMovies.length ? (
                <div className={styled.containerBanner}
                    style={{ '--bg-image': `url(${filteredMovies[movieSelect]?.img})` } as React.CSSProperties}>
                    <div key={movieSelect} className={`${styled.bannerInfoMovie} ${styled.fade}`}>
                        <h2>{filteredMovies[movieSelect]?.title}</h2>
                        <h4>{filteredMovies[movieSelect]?.date}</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Similique accusantium quisquam perspiciatis, quas recusandae sequi
                            nostrum dolor debitis ipsum delectus eum soluta exercitationem rem
                            placeat aliquam optio explicabo praesentium iste porro architecto!
                        </p>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae, modi!</p>
                        <Button action={() => handleDelete(movieSelect)} text='Remove' />
                        <Button action={() => handleEdit(movieSelect)} text='Edit' />
                    </div>
                    <div className={styled.bannerImgMovie}>
                        <div className={styled.imgContent}>
                            <img key={movieSelect} className={styled.fade} src={filteredMovies[movieSelect]?.img} alt='' />
                        </div>
                    </div>
                </div>
            ) : filteredMovies.length === 0 ? (
                <div className={styled.containerNoneMovies}>
                    <h2>No movies to show</h2>
                    <TbMovieOff className={styled.iconNoneMovies} size={120} />
                </div>
            ) : null}

            <main className={styled.containerMain}>

                {movies.length ? (
                    <div className={styled.contendSearch} style={{ paddingTop: `${filteredMovies.length ? '' : '100px'}` }}>
                        <Search onSearch={handleSearch} />
                        <div onClick={handleOrder} className={styled.filterBtn}>
                            <HiOutlineFilter color='#fff' size={20} />
                        </div>
                    </div>
                ) : null}
                {filteredMovies.length ? (
                    <div className={styled.gridMovies}>
                        {filteredMovies.map((movie, index) => (
                            <Card
                                key={index}
                                data={movie}
                                actionSelect={() => handleSelect(index)}
                                actionDelete={() => handleDelete(index)}
                                className={index === filteredMovies.length - 1 ? styled.newMovie : ''}
                            />
                        ))}
                    </div>
                ) : null}
            </main>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                className={styled.modalContent}
                overlayClassName={styled.modalOverlay}
            >
                <h2>{isEditing ? 'Edit Movie' : 'Create Movie'}</h2>
                <div className={styled.modalForm}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                    />
                    <input
                        type="text"
                        value={date}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d*$/.test(value)) {
                                setDate(value);
                            }
                        }}
                        placeholder="Date"
                    />
                    <input
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                    />

                    {image && (
                        <div className={styled.modalCropperContainer}>
                            <Cropper
                                image={image}
                                crop={crop}
                                zoom={zoom}
                                aspect={2 / 3}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        </div>
                    )}

                    <Button text="Save Movie" action={handleSaveMovie} />
                    <Button text="Cancelar" action={handleSaveMovieCancel} />

                </div>
            </Modal>

        </>
    );
}

export default App;
