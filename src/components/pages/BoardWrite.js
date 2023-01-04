import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Editor from '../CKEditor';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
    palette: {
      primary: {
        main: '#337ab7',
      },
    },
});

export default function BoardWrite() {
    const navigate = useNavigate();

    const style = {
       paddingRight:'10px'
    }

    return(
        <>
            <Typography variant="h5" align='center' gutterBottom sx={{borderBottom:'1px solid #888'}}>
                핫딜 등록
            </Typography>
            <Box component="form">
                <Box sx={{marginTop:'30px',marginBottom:'30px'}}>
                    <table>
                        <tbody>
                            <tr>
                                <td style={style}>상품 분류</td>
                                <td>
                                    <Select value={0} size="small">
                                        <MenuItem value={0}>먹거리</MenuItem>
                                        <MenuItem value={1}>PC제품</MenuItem>
                                        <MenuItem value={2}>가전제품</MenuItem>
                                        <MenuItem value={3}>생활용품</MenuItem>
                                        <MenuItem value={4}>의류</MenuItem>
                                    </Select>
                                </td>
                            </tr>
                            <tr>
                                <td>제목</td>
                                <td><TextField name='postTitle' size="small" margin="dense" sx={{width:300}}/></td>
                            </tr>
                            <tr>
                                <td style={style}>URL 링크</td>
                                <td><TextField name='postUrl' size="small" margin="dense" sx={{width:300}}/></td>
                            </tr>
                            <tr>
                                <td>쇼핑몰</td>
                                <td><TextField name='productMall' size="small" margin="dense"/></td>
                            </tr>
                            <tr>
                                <td>상품명</td>
                                <td><TextField name='productName' size="small" margin="dense"/></td>
                            </tr>
                            <tr>
                                <td>가격</td>
                                <td><TextField name='productPrice' size="small" margin="dense"/></td>
                            </tr>
                            <tr>
                                <td>배송비</td>
                                <td><TextField name='deliveryCharge' size="small" margin="dense"/></td>
                            </tr>
                        </tbody>
                    </table>
                </Box>
                <Editor/>
                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    spacing={2}
                    sx={{
                        mt:3,
                        mb:2
                    }}
                >
                    <ThemeProvider theme={theme}>
                        <Button type="submit" variant="contained" size="small">등록</Button>
                        <Button variant="contained" size="small" onClick={()=>navigate('/')}>취소</Button>
                    </ThemeProvider>
                </Stack>
            </Box>
        </>
    );
}