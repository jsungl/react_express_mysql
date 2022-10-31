import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar({target,searchKeyword,searchText,onChangeTarget,onChangeInput,keyword}) {

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', mb:2 }}>
            <FormControl sx={{ mr:2, minWidth: 120 }} size="small">
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={target}
                    onChange={onChangeTarget}>
                        <MenuItem value={"title_content"}>제목+내용</MenuItem>
                        <MenuItem value={"title"}>제목</MenuItem>
                        <MenuItem value={"content"}>내용</MenuItem>
                        <MenuItem value={"writer"}>글쓴이</MenuItem>
                </Select>
            </FormControl>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
                onSubmit={searchKeyword}
            >
                <TextField
                    fullWidth
                    name="search-keyword"
                    placeholder="Search"
                    type="search"
                    variant="standard"
                    InputProps={{ disableUnderline: true }}
                    sx={{ml:1}}
                    onChange={onChangeInput}
                    inputRef={searchText}
                    value={keyword}
                />
                <IconButton type="submit" sx={{ p: '10px' }}>
                    <SearchIcon />
                </IconButton>
            </Paper>
        </Box>
    );
}