function dinhDangSo(n: number|undefined){
    if(n===undefined){
        return 0;
    }
    if(isNaN(n)){
        return 0;
    }
    // Sử dụng hàm toLocaleString để định dạng số
    return n.toLocaleString("vi-VN");
}

export default dinhDangSo;