import { useSearchParams, createSearchParams, useNavigate} from 'react-router-dom';

export function SearchForm() {
    const navigate = useNavigate();

    const pathname = '';
    const [searchParams, setSearchParams] = useSearchParams({q:''});

    const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
        setSearchParams({q: e.currentTarget.value});
      };


    const handleSubmit = function (event: { preventDefault: () => void; }) {

        const path = {
            pathname,
            search: createSearchParams(searchParams).toString()
        };

        event.preventDefault();
        navigate(path);
        window.location.reload();
    };

    const handleClick = (event: { preventDefault: () => void; }) => {
        const path = {
            pathname,
            search: createSearchParams(searchParams).toString()
          };
    
        event.preventDefault();
        navigate(path);
        window.location.reload();
    };
  
    return (
      <form id="search__inputForm" onSubmit={handleSubmit} >
            <div className="search__inputBlock">
                <input type="search" className="search__input" onChange={onChange} placeholder="Search for music..."/>
                    <a><button type="submit" className="search__buttonSearch" onClick={handleClick}></button></a>
                </div>
        </form> 
    );

}